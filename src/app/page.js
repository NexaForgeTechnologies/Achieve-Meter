import DifferenceCont from "@/containers/DifferenceCont";
import EnterpriseFeatureCont from "@/containers/EnterpriseFeatureCont";
import FormApplication from "@/containers/FormApplication";
import HomeCont from "@/containers/HomeCont";
import InsideMyAchieve from "@/containers/InsideMyAchieve";
import TwoAudienceCont from "@/containers/TwoAudienceCont";
import TwoTracksCont from "@/containers/TwoTracksCont";
import WhoItsForCont from "@/containers/WhoItsForCont";
import WhyMyAchieveCont from "@/containers/WhyMyAchieveCont";

export default function Home() {
  return (
    <>
      <HomeCont />
      <TwoAudienceCont />
      <InsideMyAchieve />
      <WhyMyAchieveCont />
      <EnterpriseFeatureCont />
      <WhoItsForCont />
      <DifferenceCont />
      <TwoTracksCont />
    </>
  );
}
