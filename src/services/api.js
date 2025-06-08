const API_URL = 'http://localhost:5000/api';

export const fetchDepartments = async () => {
  const response = await fetch(`${API_URL}/departments`);
  return await response.json();
};

export const addDepartment = async (name) => {
  const response = await fetch(`${API_URL}/departments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  return await response.json();
};

export const fetchDesignations = async (departmentId) => {
  const response = await fetch(`${API_URL}/designations/${departmentId}`);
  return await response.json();
};

export const addDesignation = async (departmentId, name) => {
  const response = await fetch(`${API_URL}/designations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ department_id: departmentId, name })
  });
  return await response.json();
};

export const fetchLeaveTypes = async () => {
  const response = await fetch(`${API_URL}/leave-types`);
  return await response.json();
};

export const addLeaveType = async (name) => {
  const response = await fetch(`${API_URL}/leave-types`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  return await response.json();
};