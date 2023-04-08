import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid"
import FeedbackData from "../data/FeedbackData"

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
  const [feedback, setFeedback] = useState(FeedbackData)
  
  //State to add feedback
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })

  //delete feedback
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  //add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback]);
  }

  //Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit(
      {
        item,
        edit: true
      }
    )
  }

  //Update feedback item
  const updateFeedback = (id, updItem) => {
    setFeedback(feedback.map((item) => item.id === id ? {...item, ...updItem} : item))
  }

  return <FeedbackContext.Provider 
    value={{
      feedback: feedback,
      feedbackEdit: feedbackEdit,
      deleteFeedback: deleteFeedback,
      addFeedback: addFeedback,
      editFeedback: editFeedback,
      updateFeedback: updateFeedback
    }}>
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext