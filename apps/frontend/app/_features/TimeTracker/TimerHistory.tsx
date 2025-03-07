import React, { useState, useEffect } from 'react';
import { Card, messageError, Button } from '@ui-components';
import { timerService } from '@/services/timer';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface TimerHistoryProps {
  taskId: string;
}

const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    remainingSeconds.toString().padStart(2, '0')
  ].join(':');
};

const formatDateTime = (dateString: string): string => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleString();
};

const ITEMS_PER_PAGE = 7;

const TimerHistory: React.FC<TimerHistoryProps> = ({ taskId }) => {
  const [timerLogs, setTimerLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    if (taskId) {
      fetchTimerLogs(taskId, currentPage);
    }
  }, [taskId, currentPage]);

  const fetchTimerLogs = async (taskId: string, page: number) => {
    try {
      setLoading(true);
      const response = await timerService.getTimerLogs(taskId, page, ITEMS_PER_PAGE);
      const { data, pagination } = response.data.data;

      console.log(data, pagination);
      
      setTimerLogs(Array.isArray(data) ? data : []);
      setTotalItems(pagination?.total || 0);
      setTotalPages(pagination?.totalPages || 1);
    } catch (error) {
      // messageError('Error fetching timer logs');
      setTimerLogs([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="">        
        {loading ? (
          <p className="text-gray-500">Loading timer history...</p>
        ) : timerLogs.length === 0 ? (
          <p className="text-gray-500">No timer logs found for this task.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Start Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      End Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {timerLogs.map((log, index) => (
                    <tr key={log?.id || index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDateTime(log?.startTime)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDateTime(log?.endTime) || 'Running'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatDuration(log?.duration || 0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination controls */}
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-500">
                Showing {timerLogs.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} to {Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} of {totalItems} entries
              </div>
              <div className="flex space-x-2">
                <Button 
                  size="sm"
                  ghost
                  disabled={currentPage === 1}
                  onClick={handlePrevPage}
                  leadingIcon={<FiChevronLeft />}
                  title="Previous"
                />
                <Button 
                  size="sm"
                  ghost
                  disabled={currentPage === totalPages}
                  onClick={handleNextPage}
                  title="Next"
                  leadingIcon={<FiChevronRight />}
                />
              </div>
            </div>
          </>
        )}
      </div>
  );
};

export default TimerHistory; 