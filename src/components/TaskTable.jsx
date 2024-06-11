import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { BiSolidEditAlt } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { AiFillEye } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTask } from '../redux/reducers/taskReducer';

const TaskTable = ({ setEditModalOpen, setDeleteModalOpen, setViewModalOpen }) => {
  const [currentTasks, setCurrentTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const dispatch = useDispatch();
  const { allTasks } = useSelector((state) => state.task);

  useEffect(() => {
    if (allTasks) {
      setCurrentTasks(allTasks);
    }
  }, [allTasks]);

  const handleView = (row) => {
    dispatch(setCurrentTask(row));
    setViewModalOpen(true);
  };

  const handleEdit = (row) => {
    dispatch(setCurrentTask(row));
    setEditModalOpen(true);
  };

  const handleDelete = (row) => {
    dispatch(setCurrentTask(row));
    setDeleteModalOpen(true);
  };

  const handleSort = (column, direction) => {
    setSortedColumn(column.selector);
    setSortDirection(direction);
  };

  const filteredTasks = currentTasks
    .filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(task =>
      statusFilter === 'All' || task.status.toLowerCase() === statusFilter.toLowerCase()
    )
    .sort((a, b) => {
      if (sortedColumn) {
        if (a[sortedColumn] < b[sortedColumn]) {
          return sortDirection === 'asc' ? -1 : 1;
        }
        if (a[sortedColumn] > b[sortedColumn]) {
          return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      }
      return 0;
    });

  const columns = [
    {
      name: 'Title',
      selector: 'title',
      sortable: true,
      cell: row => <div className="font-medium">{row.title}</div>,
    },
    {
      name: 'Description',
      selector: 'description',
    },
    {
      name: 'Deadline',
      selector: 'deadline',
      sortable: true,
      cell: row => <div>{new Date(row.deadline).toLocaleDateString()}</div>,
    },
    {
      name: 'Priority Level',
      selector: 'priorityLevel',
      sortable: true,
      cell: row => <div>{row.priorityLevel}</div>,
    },
    {
      name: "Created At",
      selector: row => row.createdAt?.substring(0, 10),
      sortable: true,
    },
    {
      name: "Status",
      selector: 'status',
      sortable: true,
      cell: row => (
        <span className={`px-2 py-1 rounded-full text-white ${row.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'}`}>
          {row.status}
        </span>
      ),
    },
    {
      name: "Actions",
      selector: (row) => (
        <div className='flex items-center gap-3 text-xl'>
          <button className='text-blue-600 hover:text-blue-800' title='View' onClick={() => handleView(row)}><AiFillEye /></button>
          <button className='text-green-600 hover:text-green-800' title='Edit' onClick={() => handleEdit(row)}><BiSolidEditAlt /></button>
          <button className='text-red-600 hover:text-red-800' title='Delete' onClick={() => handleDelete(row)}><MdDelete /></button>
        </div>
      )
    }
  ];

  const customStyles = {
    headCells: {
      style: {
        background: 'linear-gradient(90deg, #284e43 0%, #284e43 100%)',
        color: 'white',
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        fontSize: '14.5px',
      },
    },
    rows: {
      style: {
        '&:nth-of-type(odd)': {
          backgroundColor: '#f8f9fa',
        },
      },
    },
  };

  return (
    <div className='flex flex-col lg:flex-row'>
      <div className="w-full lg:w-1/4 p-4">
        <div className="p-4 rounded-md shadow-lg bg-white">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Filters</h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Search by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
            <select
              value={sortedColumn === 'deadline' ? 'deadline' : sortedColumn === 'priorityLevel' ? 'priority' : 'default'}
              onChange={(e) => {
                if (e.target.value === 'deadline') {
                  setSortedColumn('deadline');
                } else if (e.target.value === 'priority') {
                  setSortedColumn('priorityLevel');
                } else {
                  setSortedColumn(null);
                }
              }}
              className="border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="default">Sort By</option>
              <option value="deadline">Deadline</option>
              <option value="priority">Priority</option>
            </select>
            <select
              value={sortDirection}
              onChange={(e) => setSortDirection(e.target.value)}
              className="border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>
      <div className='w-full lg:w-3/4 p-4'>
        <DataTable
          columns={columns}
          data={filteredTasks}
          customStyles={customStyles}
          pagination
          sortServer
          onSort={handleSort}
          sortIcon={<span>&nbsp;</span>}
          fixedHeader
          fixedHeaderScrollHeight="600px"
          highlightOnHover
          pointerOnHover
          striped
        />
      </div>
    </div>
  );
}

export default TaskTable;
