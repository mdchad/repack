import Section from '../ui/Section/Section';
import Card from '../ui/Card/Card';

const plans = [
  {
    title: 'Phase 1',
    icon: 'web-design',
    data: [
      {
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      {
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      {
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      }
    ]
  },
  {
    title: 'Phase 2',
    icon: 'web-design',
    data: [
      {
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      {
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      {
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      }
    ]
  },
  {
    title: 'Phase 3',
    icon: 'web-design',
    data: [
      {
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      {
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      {
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      }
    ]
  }
];

function checkLeftorRight(index: number) {
  if (index % 2 === 0) {
    return 'mb-8 flex justify-between items-center w-full right-timeline';
  } else {
    return 'mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline';
  }
}

function Plan() {
  return (
    <Section id="plans">
      <div className="mx-auto max-w-6xl px-6 flex items-center flex-col">
        <p className="text-[#F1887A] uppercase tracking-[.25em]">Agenda</p>
        <h1 className="text-left pb-[25px] md:text-[39px] text-[25px] dark:text-[#EBD9A1] text-[#293C4A]">
          Our Plans
        </h1>

        <div className="container">
          <div className="relative wrap overflow-hidden h-full">
            <div className="border-2-2 absolute border-opacity-20 border-gray-700 dark:border-white  h-full border left-[50%] invisible xl:visible"></div>

            {plans.map((plan, index) => (
              // odd/even index
              <div key={index} className={`${checkLeftorRight(index + 1)}`}>
                <div className="order-1 w-5/12 invisible xl:visible"></div>
                <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full invisible xl:visible">
                  <h1 className="mx-auto font-semibold text-lg text-white">
                    {index + 1}
                  </h1>
                </div>
                <Card className="order-1 xl:w-5/12 xl:p-6 flex flex-col flex-start gap-4">
                  <img
                    src={`/icons/${plan.icon}.png`}
                    alt={plan.title}
                    className="w-[50px] h-[50px] invert dark:invert-0"
                  />
                  <h3 className="font-bold text-[#F1887A] dark:text-[#F1887A] text-xl">
                    {plan.title}
                  </h3>
                  {plan.data.map((item, index) => (
                    <p
                      key={index}
                      className="text-sm text-[#293C4A] dark:text-white"
                    >
                      {item.description}
                    </p>
                  ))}
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Plan;
