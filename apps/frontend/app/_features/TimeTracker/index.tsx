import React, { useState, useEffect } from 'react';
import { Button, Card, messageError } from '@ui-components';
import { FaPlay, FaStop, FaClock, FaHistory } from 'react-icons/fa';
import { timerService } from '@/services/timer';
import TimerHistory from './TimerHistory';
import { useTimerStore } from './timerStore';

interface TimeTrackerProps {
  taskId: string;
  taskName?: string;
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

const TimeTracker: React.FC<TimeTrackerProps> = ({ taskId, taskName }) => {
  const [showLogs, setShowLogs] = useState<boolean>(false);
  const { 
    activeTimer, 
    elapsedTime, 
    isRunning, 
    startTimer, 
    stopTimer, 
    checkCurrentTimer 
  } = useTimerStore();

  // Check if there's a running timer when component mounts
  useEffect(() => {
    const checkTimer = async () => {
      await checkCurrentTimer();
    };

    checkTimer();
  }, [taskId, checkCurrentTimer]);

  const handleStartTimer = async () => {
    await startTimer(taskId, taskName);
  };

  const handleStopTimer = async () => {
    await stopTimer();
  };

  const toggleLogs = () => {
    setShowLogs(!showLogs);
  };

  return (
    <div className="space-y-4">
      <Card>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">{taskName || 'Task Timer'}</h3>
            <span className={`px-2 py-1 rounded text-sm ${isRunning ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              {isRunning ? 'Running' : 'Stopped'}
            </span>
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <div className="text-3xl font-bold flex items-center">
              <FaClock className="mr-2" />
              {formatDuration(elapsedTime)}
            </div>
          </div>
          
          <div className="flex justify-center gap-4 mb-4">
            {!isRunning ? (
              <Button 
                primary
                onClick={handleStartTimer}
                leadingIcon={<FaPlay />}
                title="Start Timer"
              />
            ) : (
              <Button 
                danger
                onClick={handleStopTimer}
                leadingIcon={<FaStop />}
                title="Stop Timer"
              />
            )}
            
            <Button 
              ghost
              onClick={toggleLogs}
              leadingIcon={<FaHistory />}
              title={showLogs ? 'Hide History' : 'Show History'}
            />
          </div>
        </div>
      </Card>
      
      {showLogs && <TimerHistory taskId={taskId} />}
    </div>
  );
};

export default TimeTracker;