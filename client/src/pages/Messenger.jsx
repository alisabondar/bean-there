import axios from 'axios';
import { useEffect, useState } from 'react';

const USER_ID = 1;
const url = 'http://localhost:5000/messenger/'
export default function Messenger() {
  const testChat = (key) => {
    var coinFlip = Math.floor(Math.random() * 2);
    console.log(coinFlip);
    return (
      <div key={key} className={`chat chat-${coinFlip ? 'start' : 'end'}`}>
        <div className="chat-image avatar">
          <div className="w-10">
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
  const testGroup = (key) => {
    return (
      <div key={key}>
        {key !== 0 ? (
          <div className="divider m-3"></div>
        ) : (<div></div>)}
        <div className="w-full flex items-start justify-center flex-col bg-[#212121] cursor-pointer h-[113px] rounded-[11px] border-[1.5px] border-grey-500">
          <p className="font-bold">Chat Name</p>
          <p>
            Member1, Member2, Member3
          </p>
          <p>
            Member2: Last Message
          </p>
        </div>
      </div>
    )
  }


  useEffect(() => {
    axios.get(url + 'rooms/user/1', {
      headesr: {
        Authorization: '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',
        Accept: '*/*',
        Connection: 'keep-alive'
      }
    }).then(result => {
      console.log('result:' + result);
    }).catch(err => {
      console.log(err);
    })
  }, []);

  return (
    <div className="flex w-full  h-screen">
      <div className="w-4/12 h-full overflow-auto max-w-[250px] min-w-[240px] bg-[black]">
        <div className="grid pt-5 grid-cols-1 justify-items-center">
          {['', '', '', ''].map((e, i) => (
            testGroup(i)
          ))}
        </div>
      </div>
      <div className="w-full h-full flex flex-items-end justify-end flex-col">
        <div className="flex w-full overflow-auto justify-start flex-col-reverse flex-items-end">
          {['', '', '', ''].map((e, i) => (
            testChat(i)
          ))}
        </div>
        <div className="flex w-full h-[90px] bg-[black] items-center p-3">
          <textarea className="textarea resize-none w-[85%] h-full" placeholder="Bio"></textarea>
          <button className="btn btn-primary h-full ml-3 w-[75px]">send</button>
        </div>
      </div>
    </div>
  )

}
