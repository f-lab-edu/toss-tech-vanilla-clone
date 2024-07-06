interface IEvent {
  type: string;
  listener: (e: Event) => void;
}

export { IEvent };
