import React from 'react';
import Section from '../ui/Section/Section';
import Card from '../ui/Card/Card';

const pricing = [
  {
    title: 'Essential',
    price: '$3.00',
    payment_type: 'Per Month',
    payment_description: 'Yearly payment',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    features: [
      {
        label: 'All limited links',
        status: true
      },
      {
        label: 'Own analytics platform',
        status: true
      },
      {
        label: 'Chat support',
        status: true
      },
      {
        label: 'Optimize hashtags',
        status: true
      },
      {
        label: 'Mobile app',
        status: false
      },
      {
        label: 'Unlimited users',
        status: false
      }
    ],
    button: {
      text: 'Subscribe',
      url: '#'
    }
  },
  {
    title: 'Premium',
    price: '$50.00',
    payment_type: 'Per Year',
    payment_description: 'One time payment',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    features: [
      {
        label: 'All limited links',
        status: true
      },
      {
        label: 'Own analytics platform',
        status: true
      },
      {
        label: 'Chat support',
        status: true
      },
      {
        label: 'Optimize hashtags',
        status: true
      },
      {
        label: 'Mobile app',
        status: true
      },
      {
        label: 'Unlimited users',
        status: true
      }
    ],
    button: {
      text: 'Subscribe',
      url: '#'
    }
  }
];

function Pricing() {
  return (
    <Section>
      <div className="container mx-auto">
        <div className="mx-">
          <div className="flex flex-col items-center mb-6">
            <p className="text-[#F1887A] uppercase tracking-[.25em]">
              Select your plan
            </p>
            <h1 className="text-left pb-[25px] md:text-[39px] text-[25px] dark:text-[#EBD9A1] text-[#293C4A]">
              Level up your work
            </h1>
          </div>

          <div className="flex-1 xl:mx-8">
            <div className="flex flex-wrap flex-row justify-center gap-8">
              {pricing.map((item, index) => (
                <Card key={index} className="max-w-sm">
                  <div>
                    <h1 className="text-xl font-medium capitalize text-gray-700 dark:text-white lg:text-3xl">
                      {item.title}
                    </h1>

                    <p className="mt-4 text-gray-500 dark:text-gray-300">
                      {item.description}
                    </p>

                    <span className="mt-4 text-2xl font-medium text-gray-700 dark:text-gray-300 sm:text-4xl flex items-baseline gap-3">
                      {item.price}
                      <h5 className="text-sm font-medium">
                        {item.payment_type}
                      </h5>
                    </span>

                    <p className="mt-1 text-gray-500 dark:text-gray-300">
                      {item.payment_description}
                    </p>

                    <button className="mt-6 w-full transform rounded-md bg-blue-600 px-4 py-2 capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-500 focus:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                      {item.button.text}
                    </button>
                  </div>

                  <div className="flex flex-col gap-4 w-full">
                    <h1 className="text-lg font-medium capitalize text-gray-700 dark:text-white lg:text-xl">
                      What’s included:
                    </h1>

                    <div className="space-y-4">
                      {item.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          {feature.status ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-blue-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-red-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                          <p className="text-gray-500 dark:text-gray-300">
                            {feature.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Pricing;
