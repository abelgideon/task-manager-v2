export function Question({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-2 text-primary">{question}</h4>
      <p>{answer}</p>
    </div>
  );
}
