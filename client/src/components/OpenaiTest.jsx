import React, {useState} from 'react'

function OpenaiTest() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await fetch('http://localhost:3001/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: input }),
        });
        const data = await response.json();

        if (response.ok) {
          setOutput(data.reply);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Hata:", error);
      }
    }
  return (
    <div className="container">
      <h1>Open AI ile sohbet</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Bir mesaj yazın"
        />
        <button type="submit">Gönder</button>
      </form>
      {output && <p>Cevap: {output}</p>}
    </div>
  )
}

export default OpenaiTest