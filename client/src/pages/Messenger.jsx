export default function Messenger() {
  const testChat = (key) => {
    var coinFlip = Math.floor(Math.random() * 2);
    console.log(coinFlip);
    return (
      <div key={key} className={`chat chat-${coinFlip ? 'start' : 'end'} border-2 border-sky-500`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <div className="chat-header">
          Obi-Wan Kenobi
          <time className="text-xs opacity-50">12:45</time>
        </div>
        <div className="chat-bubble">Not leave it in  DarknessDarkness   DarknessDarkness</div>
      </div>
    );
  }

  return (
    <div className="flex border-2 border-red-500 w-full">
      <div className="w-1/5 h-screen p-4 border-2 border-green-500 ">
        <div className="grid grid-cols-1 gap-5 border-2 border-sky-500  ">
          <div>
            chat groups or something here
          </div>
        </div>
      </div>
      <div className="w-4/5 h-screen p-4 border-2 border-green-500 ">
        <div className="grid grid-cols-1 gap-5">
          {['', '', '', ''].map((e, i) => (
            testChat(i)
          ))}
        </div>
      </div>
    </div>
  )

}
