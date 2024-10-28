export default function Calendar() {
  return (
    <>
      <iframe
        src="https://embed.styledcalendar.com/#1QCdKYTJEHorJTaHLzig"
        title="Gigs Calendar"
        className="styled-calendar-container"
        width="800"
        height="700"
        style={{ border: 'none' }}
        data-cy="calendar-embed-iframe"
      ></iframe>
      <script
        async
        type="module"
        src="https://embed.styledcalendar.com/assets/parent-window.js"
      ></script>
    </>
  );
}
