import {
  LinkedinShareButton,
  EmailShareButton,
  WhatsappShareButton,
  EmailIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";

const ShareResume = ({ resumeUrl }: { resumeUrl: string }) => {
  const shareTitle = "Check out my resume!";
  const shareSummary = "Here is my latest resume – take a look!";

  return (
    <div className="flex gap-2">
      <LinkedinShareButton url={resumeUrl} summary={shareSummary}>
        <LinkedinIcon size={32} round={true} />
      </LinkedinShareButton>

      <WhatsappShareButton url={resumeUrl} title={shareTitle}>
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>

      <EmailShareButton
        url={resumeUrl}
        subject={shareTitle}
        body={shareSummary}>
        <EmailIcon size={32} round={true} />
      </EmailShareButton>
    </div>
  );
};

export default ShareResume;
