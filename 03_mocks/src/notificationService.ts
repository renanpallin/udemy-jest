// jest.useFakeTimers()
// Funções baseadas em tempo real tornam testes:
//   - LENTOS: um setTimeout de 5s faria o teste demorar 5 segundos
//   - NÃO DETERMINÍSTICOS: dependem do relógio da máquina
// Solução: substituir as funções de tempo por versões mockadas com jest.useFakeTimers()

export class NotificationService {
  sendDelayed(message: string, delayMs: number): void {
    setTimeout(() => {
      this.send(message);
    }, delayMs);
  }

  send(message: string): void {
    console.log(`[NotificationService] Sending: ${message}`);
  }

  scheduleRecurring(callback: () => void, intervalMs: number): NodeJS.Timeout {
    return setInterval(callback, intervalMs);
  }
}
