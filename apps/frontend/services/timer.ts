import { httpGet, httpPost } from "./_req";

export const timerService = {
  startTimer(taskId: string) {
    return httpPost("/api/timer/start", { taskId });
  },

  stopTimer(timerId?: string) {
    return httpPost("/api/timer/stop", { timerId });
  },

  getCurrentTimer() {
    return httpGet("/api/timer/current");
  },

  getTimerLogs(taskId: string, page = 1, limit = 7) {
    return httpGet(`/api/timer/logs/${taskId}?page=${page}&limit=${limit}`);
  }
};

export default timerService;