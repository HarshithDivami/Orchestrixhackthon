// API utilities for authenticated requests
const API_BASE_URL = 'http://localhost:9000';

// Get auth token from localStorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// Create authenticated fetch wrapper
export const authenticatedFetch = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getAuthToken();
  
  console.log(`[API] Making authenticated request to: ${API_BASE_URL}${endpoint}`);
  console.log(`[API] Auth token: ${token ? 'Present' : 'Missing'}`);
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  console.log(`[API] Request headers:`, headers);

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  console.log(`[API] Response status: ${response.status}`);

  // If unauthorized, clear token and redirect to login
  if (response.status === 401) {
    console.log('[API] Unauthorized response, clearing auth token');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    window.location.reload(); // This will show login screen
  }

  return response;
};

// API endpoints
export const api = {
  // Auth endpoints
  auth: {
    // For OAuth flows, we redirect directly to backend endpoint instead of fetch
    google: () => {
      console.log(`[API] Redirecting to Google OAuth: ${API_BASE_URL}/api/auth/google`);
      window.location.href = `${API_BASE_URL}/api/auth/google`;
    },
    
    googleCallback: (code: string, state?: string) => {
      console.log(`[API] Exchanging OAuth code with backend: ${API_BASE_URL}/api/auth/google/callback`);
      console.log(`[API] Code: ${code}`);
      console.log(`[API] State: ${state || 'None'}`);
      
      // Build URL with query parameters since GET requests can't have a body
      const params = new URLSearchParams({ code });
      if (state) {
        params.append('state', state);
      }
      
      const url = `${API_BASE_URL}/api/auth/google/callback?${params.toString()}`;
      console.log(`[API] Full callback URL: ${url}`);
      
      return fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
    },

    logout: () => {
      console.log('[API] Logging out...');
      return authenticatedFetch('/api/auth/logout', { method: 'GET' });
    },
    
    me: () => authenticatedFetch('/api/auth/me', { method: 'POST' }),
  },

  // Add other API endpoints as needed
  // users: {
  //   list: () => authenticatedFetch('/api/users'),
  //   create: (userData: any) => authenticatedFetch('/api/users', {
  //     method: 'POST',
  //     body: JSON.stringify(userData),
  //   }),
  // },
  
  // inventory: {
  //   list: () => authenticatedFetch('/api/inventory'),
  //   // ... other endpoints
  // },
};
