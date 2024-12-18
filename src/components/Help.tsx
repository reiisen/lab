import { createSignal, JSX } from 'solid-js';

interface HelpStep {
  title: string;
  content: string;
  image?: string;
}

interface HelpProps {
  steps: HelpStep[];
}

export const Help = (props: HelpProps) => {
  // Create a signal to track the current step
  const [currentStep, setCurrentStep] = createSignal(0);

  // Function to go to the next step
  const nextStep = () => {
    if (currentStep() < props.steps.length - 1) {
      setCurrentStep(currentStep() + 1);
    }
  };

  // Function to go to the previous step
  const prevStep = () => {
    if (currentStep() > 0) {
      setCurrentStep(currentStep() - 1);
    }
  };

  return (
    <div class="max-w-md mx-auto p-8 bg-white rounded-lg">
      <div class="text-center">
        <h2 class="text-2xl font-bold mb-6">
          {props.steps[currentStep()].title}
        </h2>

        {props.steps[currentStep()].image && (
          <img
            src={props.steps[currentStep()].image}
            alt={`Step ${currentStep() + 1} illustration`}
            class="mx-auto mb-6 rounded-md max-h-56 object-cover"
          />
        )}

        <p class="mb-10">
          {props.steps[currentStep()].content}
        </p>

        <div class="flex justify-between items-center gap-4">
          <button
            onClick={prevStep}
            disabled={currentStep() === 0}
            class="px-6 py-3 bg-gray-100 rounded
                   disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>

          <div class="text-gray-600">
            Step {currentStep() + 1} of {props.steps.length}
          </div>

          <button
            onClick={nextStep}
            disabled={currentStep() === props.steps.length - 1}
            class="px-6 py-3 bg-blue-500 text-white rounded
                   disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep() === props.steps.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};
