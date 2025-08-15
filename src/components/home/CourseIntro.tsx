import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { PulseLoader } from "react-spinners";
import ChevronRight from "src/assets/icons/chevronRight.svg?react";
import { colors } from "src/constants/colorPalette";
import { feedbackMessages } from "src/constants/constants";
import useRequest from "src/hooks/useRequest";
import { ID } from "src/types";

import CourseSectionContainer from "./CourseSectionContainer";
import Card from "../Card";

const header1 = "Welcome!";
const header2 = "Before you begin, here are a few key things to know:";

const textLines = [
  {
    header: "Set yourself up for success",
    text: "Find a quiet space free from distractions. Keep a pen and paper handy in case you want to make notes or jot down any questions for your ‘Call with the RPA’ after the course. You can take the course on your computer, tablet, or phone - whatever works best for you.",
  },
  {
    header: "Course structure",
    text: "The course is divided into self-paced modules, each consisting of a video and a quiz. You can stop and resume at any time. We recommend completing the course over a few days rather than in a single sitting.",
  },
  {
    header: "Course Notes",
    text: "A downloadable set of Course Notes is available above the list of modules and next to each video. These notes are a quick reference guide to key points but are not a substitute for watching the videos, which provide the full depth of content.",
  },
  {
    header: "How to progress",
    text: "Watch each video in full, then complete the quiz that follows. You’ll need to pass each quiz to unlock the next module, and all quizzes must be passed to complete the course.",
  },
  {
    header: "Quizzes",
    text: "A score of 100% is required to pass each quiz, but you have unlimited attempts. If you're unsure about a question, revisit the relevant part of the video or consult the Course Notes.",
  },
  {
    header: "Types of questions",
    text: "Some quiz questions require a single correct answer, while others may require multiple answers. This will be clearly stated in each question - read carefully before answering.",
  },
  {
    header: "Time commitment",
    text: "Each module typically takes between 10 and 30 minutes to complete. You can adjust the playback speed of the videos to suit your learning style - speed it up if the content is straightforward, or slow it down if you’d like more time to take things in.",
  },
  {
    header: "Need help?",
    text: "If you have any questions or run into issues, get in touch with us directly. Contact details can be found at supanova-rp.co.uk.",
  },
];

interface Props {
  courseId: ID;
  courseTitle: string;
  onPressBack: () => void;
  onPressBeginCourse: () => void;
}

export const CourseIntro: React.FC<Props> = ({
  courseId,
  courseTitle,
  onPressBack,
  onPressBeginCourse,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // TODO: could refactor to useLazyQuery
  const setIntroCompleted = useRequest("/set-intro-completed");

  const handleOnPressBeginCourse = () => {
    setIntroCompleted({
      requestBody: {
        courseId,
      },
      onSuccess: () => {
        setError(false);
        setLoading(false);
        onPressBeginCourse();
      },
      onError: () => {
        setError(true);
        setLoading(false);
      },
      onRequestBegin: () => {
        setError(false);
        setLoading(true);
      },
    });
  };

  return (
    <CourseSectionContainer
      hasDirectionButtons={false}
      courseTitle={courseTitle}
      canGoBack={false}
      onClickBackChevron={onPressBack}
      className="course-intro-container"
    >
      <div className="course-intro-inner-container">
        <div className="course-intro">
          <Card className="course-intro-card animate-in">
            <div className="course-intro-header">
              <h2 className="intro-title">{header1}</h2>
              <h3 className="intro-subtitle">{header2}</h3>
            </div>

            <div className="points-grid">
              {textLines.map((textLine, index) => (
                <div key={index} className="point-item-container">
                  <div className="point-item">
                    <ChevronRight stroke="#adaaaa" className="point-arrow" />
                    <div className="point-content">
                      <h3 className="point-header">{textLine.header}</h3>
                      <p className="point-text">{textLine.text}</p>
                    </div>
                  </div>
                  <div className="point-border" />
                </div>
              ))}
            </div>

            {error ? (
              <Card className="animate-in mb-3 content-card-compact card-warning">
                <span>{feedbackMessages.genericErrorTryAgain}</span>
              </Card>
            ) : null}

            <div className="course-intro-footer">
              <Button
                onClick={handleOnPressBeginCourse}
                className="btn btn-primary mt-3"
                style={{ width: 160 }}
                disabled={loading}
              >
                {loading ? (
                  <PulseLoader color={colors.white} size={8} />
                ) : (
                  "Begin the course"
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </CourseSectionContainer>
  );
};
