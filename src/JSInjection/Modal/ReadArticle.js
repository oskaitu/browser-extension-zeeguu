/*global chrome*/
import { TranslatableText } from "../../zeeguu-react/src/reader/TranslatableText";
import {
  EXTENSION_SOURCE,
  LIST_CONTENT,
  PARAGRAPH_CONTENT,
  HEADER_CONTENT,
} from "../constants";
import { InvisibleBox, StyledBox } from "./Modal.styles";
import ReviewVocabulary from "./ReviewVocabulary";
import LikeFeedbackBox from "../../zeeguu-react/src/reader/LikeFeedbackBox";
import DifficultyFeedbackBox from "../../zeeguu-react/src/reader/DifficultyFeedbackBox";
import { random } from "../../zeeguu-react/src/utils/basic/arrays";

import { colors } from "@mui/material";

export function ReadArticle({
  articleId,
  api,
  author,
  interactiveTextArray,
  interactiveTitle,
  articleImage,
  openReview,
  translating,
  pronouncing,
  url,
  setPersonalCopySaved,
  personalCopySaved,
  articleInfo,
  setArticleInfo,
  answerSubmitted,
  setAnswerSubmitted,
}) {
  if (articleImage) {
    if (articleImage.src === null) {
      articleImage = undefined;
    }
  }

  
 

  return (
    <>
      <div className="article-container">
        <h1>
          <TranslatableText
            interactiveText={interactiveTitle}
            translating={translating}
            pronouncing={pronouncing}
          />
        </h1>
        <p className="author">{author}</p>
        <hr />
        {articleImage && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              alt={articleImage.alt}
              src={articleImage.src}
              style={{
                width: "100%",
                borderRadius: "1em",
                marginBottom: "1em",
              }}
            />
          </div>
        )}
        {interactiveTextArray.map((paragraph) => {
          const CustomTag = `${paragraph.tag}`;
          if (
            HEADER_CONTENT.includes(paragraph.tag) ||
            PARAGRAPH_CONTENT.includes(paragraph.tag)
          ) {
            return (
              <CustomTag>
                <TranslatableText
                  interactiveText={paragraph.text}
                  translating={translating}
                  pronouncing={pronouncing}
                />
              </CustomTag>
            );
          }
          if (LIST_CONTENT.includes(paragraph.tag)) {
            let list = Array.from(paragraph.list);
            return (
              <CustomTag>
                {list.map((paragraph, i) => {
                  return (
                    <li key={i}>
                      <TranslatableText
                        interactiveText={paragraph.text}
                        translating={translating}
                        pronouncing={pronouncing}
                      />
                    </li>
                  );
                })}
              </CustomTag>
            );
          }
        })}
        <div id={"bottomRow"}>
          <ReviewVocabulary
            articleId={articleId}
            api={api}
            openReview={openReview}
          />
          <StyledBox>
            <h4
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}>
              {"Help us make Zeeguu even smarter by answering these questions."}
            </h4>
            <LikeFeedbackBox
              api={api}
              articleID={articleId}
              articleInfo={articleInfo}
              setArticleInfo={setArticleInfo}
              source={EXTENSION_SOURCE}
              setAnswerSubmitted={setAnswerSubmitted}
            />
            <DifficultyFeedbackBox 
              api={api} 
              articleID={articleId} 
              articleInfo={articleInfo}
              setArticleInfo={setArticleInfo}
              setAnswerSubmitted={setAnswerSubmitted} 
            />
            {answerSubmitted && (
                <InvisibleBox>
                <h3 align="center">Thank You {random(["🤗", "🙏", "😊", "🎉"])}</h3>
              </InvisibleBox>
            )} 
          </StyledBox>
        </div>
      </div>
    </>
  );
}
