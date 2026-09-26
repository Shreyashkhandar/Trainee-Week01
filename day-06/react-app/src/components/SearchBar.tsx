type SearchBarProps = {
  searchText: string;
  department: string;
  onSearchChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onSortChange: (value: string) => void;
  sortValue: string;
  departments: string[];
};

export function SearchBar({
  searchText,
  department,
  onSearchChange,
  onDepartmentChange,
  onSortChange,
  sortValue,
  departments,
}: SearchBarProps) {
  return (
    <section className="toolbar">
      <input
        type="search"
        value={searchText}
        placeholder="Search by name or email"
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <select value={department} onChange={(event) => onDepartmentChange(event.target.value)}>
        <option value="All">All Departments</option>
        {departments.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select value={sortValue} onChange={(event) => onSortChange(event.target.value)}>
        <option value="name-asc">Name: A-Z</option>
        <option value="name-desc">Name: Z-A</option>
        <option value="salary-asc">Salary: Low to High</option>
        <option value="salary-desc">Salary: High to Low</option>
      </select>
    </section>
  );
}
