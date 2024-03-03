const Notification = (props) => {
    if (props.class === null) {
        return (null)
    }
    else if (props.class === 'warning-error'){
        return (
            <div className='warning-error'> 
            There was an error
        </div>
        )
    }
    else if (props.class === 'warning-success-update'){
    return (
        <div className='warning-success'> 
            Updated successfully
        </div>
    )
    }
    else {
        return (
            <div className="warning-success">
                Added Successfully
            </div>
        )
    }
}

export default Notification