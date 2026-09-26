import { useEffect, useState } from 'react';
import type { Employee } from '../types/Employee';

const STORAGE_KEY = 'day-06-employee-data';

export function useEmployeeData() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {
          setEmployees(JSON.parse(saved));
          setLoading(false);
          return;
        }

        const response = await fetch('/employees.json');

        if (!response.ok) {
          throw new Error('Unable to load employee data.');
        }

        const data: Employee[] = await response.json();
        setEmployees(data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (loadError) {
        const message = loadError instanceof Error ? loadError.message : 'Something went wrong while loading employees.';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, []);

  const saveEmployees = (nextEmployees: Employee[]) => {
    setEmployees(nextEmployees);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextEmployees));
    } catch {
      setError('Local storage is unavailable, so changes may not persist after refresh.');
    }
  };

  return { employees, loading, error, saveEmployees };
}
