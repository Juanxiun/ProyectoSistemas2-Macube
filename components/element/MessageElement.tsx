interface messageProps {
  message: string;
  typeM: boolean;
}

export function MessageElement({ message, typeM }: messageProps) {
  console.log(typeM)
  return (
    <div class={typeM? ("Message-S") : ("Message-A")}>
      <p class="message-text">
        {message}
      </p>
    </div>
  );
}
