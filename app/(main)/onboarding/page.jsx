import { getUserOnboardingStatus } from "@/action/user";
import { industries } from "@/data/industries";
import { redirect } from "next/navigation";
import OnboardForm from "./_components/OnboardForm";

const OnBoardingPage = async () => {
  // check if user is already on board or not

  const { isOnboarded } = await getUserOnboardingStatus();
  if (isOnboarded) {
    redirect("/dashboard");
  }

  return (
    <main>
      <OnboardForm industries={industries} />
    </main>
  )
}

export default OnBoardingPage