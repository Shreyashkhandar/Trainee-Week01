const STORAGE_KEY = 'employee-dashboard-data';

const state = {
  employees: [],
  searchTerm: '',
  departmentFilter: 'All',
  sortKey: 'name',
  sortDirection: 'asc',
  editingId: null,
};

const elements = {};

document.addEventListener('DOMContentLoaded', () => {
  cacheElements();
  bindEvents();
  loadEmployees();
});

function cacheElements() {
  elements.searchInput = document.getElementById('searchInput');
  elements.departmentFilter = document.getElementById('departmentFilter');
  elements.sortControl = document.getElementById('sortControl');
  elements.addEmployeeBtn = document.getElementById('addEmployeeBtn');
  elements.employeeFormSection = document.getElementById('employeeFormSection');
  elements.employeeForm = document.getElementById('employeeForm');
  elements.formTitle = document.getElementById('formTitle');
  elements.cancelFormBtn = document.getElementById('cancelFormBtn');
  elements.employeeTableBody = document.getElementById('employeeTableBody');
  elements.totalEmployees = document.getElementById('totalEmployees');
  elements.averageSalary = document.getElementById('averageSalary');
  elements.departmentCount = document.getElementById('departmentCount');
  elements.messageBox = document.getElementById('messageBox');
  elements.employeeDetails = document.getElementById('employeeDetails');
  elements.detailsContent = document.getElementById('detailsContent');
  elements.closeDetailsBtn = document.getElementById('closeDetailsBtn');
}

function bindEvents() {
  elements.searchInput.addEventListener('input', (event) => {
    state.searchTerm = event.target.value.trim().toLowerCase();
    renderEmployees();
  });

  elements.departmentFilter.addEventListener('change', (event) => {
    state.departmentFilter = event.target.value;
    renderEmployees();
  });

  elements.sortControl.addEventListener('change', (event) => {
    const [key, direction] = event.target.value.split('-');
    state.sortKey = key;
    state.sortDirection = direction;
    renderEmployees();
  });

  elements.addEmployeeBtn.addEventListener('click', () => {
    openEmployeeForm();
  });

  elements.cancelFormBtn.addEventListener('click', () => {
    closeEmployeeForm();
  });

  elements.employeeForm.addEventListener('submit', handleEmployeeSubmit);
  elements.closeDetailsBtn.addEventListener('click', hideEmployeeDetails);
}

async function loadEmployees() {
  try {
    const savedEmployees = readFromStorage();

    if (savedEmployees && savedEmployees.length > 0) {
      state.employees = savedEmployees;
      renderEmployees();
      return;
    }

    const response = await fetch('./data/employees.json');

    if (!response.ok) {
      throw new Error(`Failed to load employee data (${response.status}).`);
    }

    const employees = await response.json();
    state.employees = employees;
    saveToStorage(state.employees);
    renderEmployees();
  } catch (error) {
    showMessage(`Error loading employees: ${error.message}`, 'error');
  }
}

function readFromStorage() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : null;
  } catch (error) {
    showMessage('Local storage is unavailable, so the page will use the current session only.', 'warning');
    return null;
  }
}

function saveToStorage(employees) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  } catch (error) {
    showMessage('Your browser local storage is full or blocked. Changes may not save after refresh.', 'warning');
  }
}

function renderEmployees() {
  const visibleEmployees = getVisibleEmployees();
  renderStatistics();
  renderTable(visibleEmployees);
}

function getVisibleEmployees() {
  let filteredEmployees = [...state.employees];

  if (state.searchTerm) {
    filteredEmployees = filteredEmployees.filter((employee) => {
      const nameMatch = employee.name.toLowerCase().includes(state.searchTerm);
      const emailMatch = employee.email.toLowerCase().includes(state.searchTerm);
      return nameMatch || emailMatch;
    });
  }

  if (state.departmentFilter !== 'All') {
    filteredEmployees = filteredEmployees.filter(
      (employee) => employee.department === state.departmentFilter
    );
  }

  filteredEmployees.sort((a, b) => {
    const direction = state.sortDirection === 'asc' ? 1 : -1;

    if (state.sortKey === 'salary') {
      return (Number(a.salary) - Number(b.salary)) * direction;
    }

    return a.name.localeCompare(b.name) * direction;
  });

  return filteredEmployees;
}

function renderStatistics() {
  const totalEmployees = state.employees.length;
  const averageSalary = totalEmployees
    ? Math.round(
        state.employees.reduce((sum, employee) => sum + Number(employee.salary), 0) /
          totalEmployees
      )
    : 0;
  const departmentCount = new Set(state.employees.map((employee) => employee.department)).size;

  elements.totalEmployees.textContent = totalEmployees;
  elements.averageSalary.textContent = `₹${averageSalary.toLocaleString()}`;
  elements.departmentCount.textContent = departmentCount;
}

function renderTable(employees) {
  if (!employees.length) {
    elements.employeeTableBody.innerHTML = `
      <tr>
        <td colspan="7" class="empty-state">No employees match the current search or filter.</td>
      </tr>
    `;
    return;
  }

  elements.employeeTableBody.innerHTML = employees
    .map(
      (employee) => `
        <tr>
          <td>${employee.name}</td>
          <td>${employee.email}</td>
          <td>${employee.department}</td>
          <td>${employee.position}</td>
          <td>₹${Number(employee.salary).toLocaleString()}</td>
          <td>${employee.location}</td>
          <td>
            <div class="action-buttons">
              <button class="action-btn details-btn" type="button" data-id="${employee.id}">Details</button>
              <button class="action-btn edit-btn" type="button" data-id="${employee.id}">Edit</button>
              <button class="action-btn delete-btn" type="button" data-id="${employee.id}">Delete</button>
            </div>
          </td>
        </tr>
      `
    )
    .join('');

  attachTableActions();
}

function attachTableActions() {
  document.querySelectorAll('.details-btn').forEach((button) => {
    button.addEventListener('click', () => showEmployeeDetails(Number(button.dataset.id)));
  });

  document.querySelectorAll('.edit-btn').forEach((button) => {
    button.addEventListener('click', () => openEmployeeForm(Number(button.dataset.id)));
  });

  document.querySelectorAll('.delete-btn').forEach((button) => {
    button.addEventListener('click', () => deleteEmployee(Number(button.dataset.id)));
  });
}

function openEmployeeForm(employeeId = null) {
  state.editingId = employeeId;
  elements.employeeFormSection.classList.remove('hidden');
  elements.employeeForm.reset();

  if (employeeId !== null) {
    const employee = state.employees.find((item) => item.id === employeeId);
    if (!employee) {
      showMessage('Employee not found.', 'error');
      return;
    }

    elements.formTitle.textContent = 'Edit Employee';
    document.getElementById('name').value = employee.name;
    document.getElementById('email').value = employee.email;
    document.getElementById('department').value = employee.department;
    document.getElementById('position').value = employee.position;
    document.getElementById('salary').value = employee.salary;
    document.getElementById('location').value = employee.location;
    return;
  }

  elements.formTitle.textContent = 'Add Employee';
}

function closeEmployeeForm() {
  elements.employeeFormSection.classList.add('hidden');
  state.editingId = null;
  elements.employeeForm.reset();
}

function handleEmployeeSubmit(event) {
  event.preventDefault();

  const formData = new FormData(elements.employeeForm);
  const employee = {
    name: String(formData.get('name') || '').trim(),
    email: String(formData.get('email') || '').trim(),
    department: String(formData.get('department') || '').trim(),
    position: String(formData.get('position') || '').trim(),
    salary: Number(formData.get('salary')),
    location: String(formData.get('location') || '').trim(),
  };

  const validation = validateEmployee(employee);

  if (!validation.valid) {
    showMessage(validation.message, 'error');
    return;
  }

  if (state.editingId !== null) {
    const index = state.employees.findIndex((item) => item.id === state.editingId);

    if (index === -1) {
      showMessage('Employee not found for editing.', 'error');
      return;
    }

    state.employees[index] = { ...state.employees[index], ...employee };
    showMessage('Employee updated successfully.', 'success');
  } else {
    const newId = state.employees.length ? Math.max(...state.employees.map((item) => item.id)) + 1 : 1;
    state.employees.push({ id: newId, ...employee });
    showMessage('Employee added successfully.', 'success');
  }

  saveToStorage(state.employees);
  renderEmployees();
  closeEmployeeForm();
}

function validateEmployee(employee) {
  if (!employee.name || !employee.email || !employee.department || !employee.position || !employee.location) {
    return { valid: false, message: 'Please fill in all required fields.' };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employee.email)) {
    return { valid: false, message: 'Please enter a valid email address.' };
  }

  if (Number.isNaN(employee.salary) || Number(employee.salary) <= 0) {
    return { valid: false, message: 'Salary must be a number greater than zero.' };
  }

  return { valid: true };
}

function showEmployeeDetails(employeeId) {
  const employee = state.employees.find((item) => item.id === employeeId);

  if (!employee) {
    showMessage('Employee not found.', 'error');
    return;
  }

  elements.detailsContent.innerHTML = `
    <div class="details-content">
      <p><strong>Name:</strong> ${employee.name}</p>
      <p><strong>Email:</strong> ${employee.email}</p>
      <p><strong>Department:</strong> ${employee.department}</p>
      <p><strong>Position:</strong> ${employee.position}</p>
      <p><strong>Salary:</strong> ₹${Number(employee.salary).toLocaleString()}</p>
      <p><strong>Location:</strong> ${employee.location}</p>
    </div>
  `;

  elements.employeeDetails.classList.remove('hidden');
}

function hideEmployeeDetails() {
  elements.employeeDetails.classList.add('hidden');
}

function deleteEmployee(employeeId) {
  const employee = state.employees.find((item) => item.id === employeeId);

  if (!employee) {
    showMessage('Employee not found.', 'error');
    return;
  }

  const confirmed = window.confirm(`Delete ${employee.name}? This action cannot be undone.`);

  if (!confirmed) {
    return;
  }

  state.employees = state.employees.filter((item) => item.id !== employeeId);
  saveToStorage(state.employees);
  renderEmployees();
  hideEmployeeDetails();
  showMessage('Employee deleted successfully.', 'success');
}

function showMessage(message, type = 'success') {
  elements.messageBox.textContent = message;
  elements.messageBox.className = `message-box ${type}`;
}
