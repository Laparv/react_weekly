
const Notification = ({message}) => {

    if(message === null) {
        return null
    }

   else if(message.includes("failed")){
        return <ErrorNotification message={message}/>
    }

    else {
        return <SuccessNotification message={message} />
}
}
const SuccessNotification = ({message}) => {

    if(message === null) {
        return null
    }

    return (
        <div className="greenMessage" >
            {message}
        </div>
    )
}
const ErrorNotification = ({message}) => {

    if(message === null) {
        return null
    }

    return (
        <div className="redMessage" >
            {message}
        </div>
    )
}

export default Notification