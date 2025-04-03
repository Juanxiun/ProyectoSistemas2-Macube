interface dataProps {
  type?: string;
  title: string;
  context: string;
}

export function Alerts({ type, title, context }: dataProps) {
  return (
    <div
      class={`flex fixed items-center p-4 mb-4 text-sm   ` + type === "danger"
        ? "alert-danger"
        : type === "message"
        ? "alert-message"
        : "alert-complete"}
      role="alert"
    >
      <svg
        class="shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span class="sr-only">{title}</span>
      <div>
        <span class="font-medium">Danger alert!</span>
        {context}
      </div>
    </div>
  );
}
