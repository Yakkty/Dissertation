import Card from "../../shared/components/UIElements/Card";
import PinboardLayout from "../components/PinboardLayout";

import "./Pinboard.css";

const EMOTIONS_ARRAY = [
  {
    id: "i1",
    title: "Anger",
    preview:
      "Anger, also known as wrath or rage, is an intense emotional state involving a strong uncomfortable and non-cooperative response to a perceived provocation, hurt or threat",
    content:
      "A person experiencing anger will often experience physical effects, such as increased heart rate, elevated blood pressure, and increased levels of adrenaline and noradrenaline.[3] Some view anger as an emotion which triggers part of the fight or flight response.[4] Anger becomes the predominant feeling behaviorally, cognitively, and physiologically when a person makes the conscious choice to take action to immediately stop the threatening behavior of another outside force.[5] The English term originally comes from the term anger of Old Norse language,mensince the times of the earliest philos possible harmful effects of suppressing anger.",
  },
  {
    id: "i2",
    title: "Happiness",
    preview:
      "Yeah buddyyy Yeah buddyyy Yeah buddyyy Yeah buddyyyYeah buddyyyYeah buddyyyYeah buddyyyYeah buddyyyYeah buddyyy",
    content:
      "Test Description v3 Test Description v3 Test Description v3 Test Description v3",
  },
  {
    id: "i3",
    title: "Anxiety",
    preview:
      "Yeah buddyyy Yeah buddyyy Yeah buddyyy Yeah buddyyyYeah buddyyyYeah buddyyyYeah buddyyyYeah buddyyyYeah buddyyy",
    content:
      "Test Description v3 Test Description v3 Test Description v3 Test Description v3",
  },
  {
    id: "i4",
    title: "Shame",
    preview:
      "Yeah buddyyy Yeah buddyyy Yeah buddyyy Yeah buddyyyYeah buddyyyYeah buddyyyYeah buddyyyYeah buddyyyYeah buddyyy",
    content:
      "Test Description v3 Test Description v3 Test Description v3 Test Description v3",
  },
  {
    id: "i5",
    title: "Excitement",
    preview:
      "Yeah buddyyy Yeah buddyyy Yeah buddyyy Yeah buddyyyYeah buddyyyYeah buddyyyYeah buddyyyYeah buddyyyYeah buddyyy",
    content:
      "Test Description v3 Test Description v3 Test Description v3 Test Description v3",
  },
  {
    id: "i6",
    title: "Sadness",
    preview:
      "Yeah buddyyy Yeah buddyyy Yeah buddyyy Yeah buddyyyYeah buddyyyYeah buddyyyYeah buddyyyYeah buddyyyYeah buddyyy",
    content:
      "Test Description v3 Test Description v3 Test Description v3 Test Description v3",
  },
];

const Pinboard = () => {
  return (
    <Card className="Pinboard-card">
      <PinboardLayout items={EMOTIONS_ARRAY} />
      {/* <div className="pinboard-footer">
          <h1>Yeah buddy</h1>
      </div> */}
    </Card>
  );
};

export default Pinboard;
