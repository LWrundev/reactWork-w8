import { useSelector,useDispatch } from "react-redux"
import { removeMsg } from "../slices/messageSlice";
import { useEffect } from "react";
export default function MessageToast(){

    const message = useSelector((state)=>state.message);
    const dispatch= useDispatch();

    //--讓message 自動移除
    useEffect(()=>{
        if(message.length > 0){
            const lastMsg = message[message.length -1]; //找到新建的msg
            const timer = setTimeout(()=>{
                dispatch(removeMsg(lastMsg.id))
            },2000);

            return ()=> clearTimeout(timer)
        }
    },[message,dispatch])

    return <section className="toast-container position-fixed top-0 end-0 p-3 z-3">
        {
            message.map((msg)=> (
                <div key={msg.id}
                className={`toast show text-bg-${msg.type} opacity-75`} 
                role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    <strong className="me-auto">{msg.title}</strong>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="toast"
                        aria-label="Close"
                        onClick={()=>dispatch(removeMsg(msg.id))}
                    />
                </div>
                <div className="toast-body">{msg.text}</div>
                </div>
            ))
        }
    </section>
}