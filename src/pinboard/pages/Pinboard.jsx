//This component is the parent component for the emotions pinboard section of the website

//Imports
import Card from "../../shared/components/UIElements/Card";
import PinboardLayout from "../components/PinboardLayout";

import "./Pinboard.css";

//Array of data to be displayed in the pinboard
const EMOTIONS_ARRAY = [
  {
    id: "i1",
    title: "Anger",
    description:
      "A strong feeling that makes you want to hurt someone or be unpleasant because of something unfair or unkind that has happened.",
    physSymptoms:
      "Increased heart rate, increaased blood pressure, sweating, feeling hot, shaking, dizziness, tightness in your chest.",

    mentSymptoms:
      "Feeling resentful towards someone or something, easily irritated, feeling tense, unable to relax.",
    emotionColour: "#C8102E",
  },
  {
    id: "i2",
    title: "Happiness",
    description:
      "An emotional state defined by feelings of joy, satisfaction, contentment and fulfillment.",
    physSymptoms:
      "Happiness can affect your body temperature, heart rate, how much you sweat, salivation and breathing.",
    mentSymptoms: "Feeling satisfied, positive, accomplished, euphoric.",
    emotionColour: "#E9E62B",
  },
  {
    id: "i3",
    title: "Anxiety",
    description:
      "Anxiety can be described as feeling of unease, worry or fear. Anxiety is a typical human reaction to stress.",
    physSymptoms:
      "Nausea, headaches, insomnia, sweating, shaking, dizziness, increased heart rate, affected rate of breathing.",
    mentSymptoms:
      "Feeling restless, tense, worried, panicking, concentration difficulties. ",
    emotionColour: "#7F2BE9",
  },
  {
    id: "i4",
    title: "Shame",
    description:
      "Shame is thought of as a feeling of embarrassment or humiliation which develops from the perception of having done something negative.",
    physSymptoms: "Crying, slumped shoulders, lack of eye contact, stuttering",
    mentSymptoms: "Feelings of guilt, rejection, insecurity, fear, regret.",
    emotionColour: "Black",
  },
  {
    id: "i5",
    title: "Boredom",
    description:
      "Boredom is a state of weariness or dissatisfaction resulting from a lack of stimuli in the environment.",
    physSymptoms:
      "Limited attention span, jittery, unable to sit still, unable to relax, fatigue.",
    mentSymptoms:
      "Lack of excitement, lack of interest in activites, low levels of motivation, feeling irritated.",
    emotionColour: "#8c9c9c",
  },
  {
    id: "i6",
    title: "Sadness",
    description:
      "Sadness is an emotional pain associated with negative emotions. These can be described as feelings of loss, despair, grief, hopelessness, sorrow.",
    physSymptoms:
      "Affected appetite or weight, loss of libido, disturbed sleep, lack of energy, sluggishness.",
    mentSymptoms:
      "Low mood, feeling hopeless, low self esteem, guilt, irritable, low motivation, indecisive, anxious, thoughts of self harm",
    emotionColour: "#8a8a8a",
  },
];

//This displays a card component containing a child layout component and a title
//The array of data is passed down to the layout component
const Pinboard = () => {
  return (
    <Card className="Pinboard-card">
      <PinboardLayout items={EMOTIONS_ARRAY} />
      {/* <div className="pinboard-footer">
          <h1>Yeah buddy</h1>
      </div> */}
      <div className="Pinboard-card__title">
        <h1>What are you feeling?</h1>
      </div>
    </Card>
  );
};

export default Pinboard;
