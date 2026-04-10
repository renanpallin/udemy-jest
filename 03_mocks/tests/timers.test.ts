// Controlando o tempo com jest.useFakeTimers()
// Sem fake timers, um setTimeout de 3000ms faria o teste demorar 3 segundos.
// Com fake timers, o Jest substitui setTimeout/setInterval/Date por versões
// que você pode avançar artificialmente com jest.advanceTimersByTime().

import { NotificationService } from "../src/notificationService";

describe("jest.useFakeTimers()", () => {
  // Ativar fake timers antes de cada teste deste bloco
  beforeEach(() => {
    jest.useFakeTimers();
  });

  // Restaurar os timers reais após cada teste
  afterEach(() => {
    jest.useRealTimers();
  });

  it("não deve enviar a notificação antes do tempo configurado", () => {
    const service = new NotificationService();
    const sendSpy = jest.spyOn(service, "send").mockImplementation(() => {});

    service.sendDelayed("Olá!", 3000);

    // Avançamos só 1 segundo — o send ainda não deve ter sido chamado
    jest.advanceTimersByTime(1000);

    expect(sendSpy).not.toHaveBeenCalled();

    sendSpy.mockRestore();
  });

  it("deve enviar a notificação exatamente quando o tempo expira", () => {
    const service = new NotificationService();
    const sendSpy = jest.spyOn(service, "send").mockImplementation(() => {});

    service.sendDelayed("Olá!", 3000);

    // Avançamos exatamente o tempo configurado
    jest.advanceTimersByTime(3000);

    expect(sendSpy).toHaveBeenCalledTimes(1);
    expect(sendSpy).toHaveBeenCalledWith("Olá!");

    sendSpy.mockRestore();
  });

  it("deve chamar o callback do intervalo o número correto de vezes", () => {
    const service = new NotificationService();
    const reminderCallback = jest.fn();

    service.scheduleRecurring(reminderCallback, 1000);

    // Avançamos 3.5 segundos — o callback deve ter sido chamado 3 vezes (em 1s, 2s e 3s)
    jest.advanceTimersByTime(3500);

    expect(reminderCallback).toHaveBeenCalledTimes(3);
  });

  it("runAllTimers: executa todos os timers pendentes de uma vez", () => {
    const service = new NotificationService();
    const sendSpy = jest.spyOn(service, "send").mockImplementation(() => {});

    service.sendDelayed("Mensagem 1", 1000);
    service.sendDelayed("Mensagem 2", 5000);
    service.sendDelayed("Mensagem 3", 10000);

    // Executa TODOS os timeouts pendentes, independente do tempo
    jest.runAllTimers();

    expect(sendSpy).toHaveBeenCalledTimes(3);

    sendSpy.mockRestore();
  });
});
