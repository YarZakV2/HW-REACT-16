import { useReducer } from "react";
import Section from "./components/Section";
import FeedbackOptions from "./components/FeedbackOptions";
import Statistics from "./components/Statistics";
import Notification from "./components/Notification";

const initialState = {
  good: 0,
  neutral: 0,
  bad: 0,
};

function feedbackReducer(state, action) {
  switch (action.type) {
    case "good":
      return { ...state, good: state.good + 1 };
    case "neutral":
      return { ...state, neutral: state.neutral + 1 };
    case "bad":
      return { ...state, bad: state.bad + 1 };
    default:
      return state;
  }
}

function useFeedback() {
  return useReducer(feedbackReducer, initialState);
}

function App() {
  const [state, dispatch] = useFeedback();

  const onLeaveFeedback = (option) => {
    dispatch({ type: option });
  };

  const { good, neutral, bad } = state;

  const total = good + neutral + bad;
  const positivePercentage = total
    ? Math.round((good / total) * 100)
    : 0;

  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={["good", "neutral", "bad"]}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>

      <Section title="Statistics">
        {total > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="No feedback given" />
        )}
      </Section>
    </div>
  );
}

export default App;