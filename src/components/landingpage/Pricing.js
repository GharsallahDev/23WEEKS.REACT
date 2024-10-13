import { Element } from 'react-scroll';
import { useState } from 'react';
import clsx from 'clsx';
import CountUp from 'react-countup';
import { plans } from '../../constants/index.js';
import Button from '../Button.js';

const Pricing = () => {
  const [isMotherToBe, setIsMotherToBe] = useState(true); // Rename state to be more meaningful

  return (
    <section>
      <Element name="pricing" id="Pricing">
        <div className="container">
          <div className="max-w-960 pricing-head_before relative mx-auto border-l border-r border-s7 bg-s8/5 pb-40 pt-28 max-xl:max-w-4xl max-lg:border-none max-md:pb-32 max-md:pt-16">
            <h3 className="h3 max-lg:h4 max-md:h5 z-3 relative mx-auto mb-14 max-w-lg text-center text-p6 max-md:mb-11 max-sm:max-w-sm">
              Flexible pricing for teams of all sizes
            </h3>

            <div className="relative z-4 mx-auto flex w-[375px] rounded-3xl border-[3px] border-s8/60 bg-s8/30 p-2 backdrop-blur-[6px] max-md:w-[310px]">
              <button
                className={clsx('pricing-head_btn', isMotherToBe && 'text-pink-950')}
                onClick={() => setIsMotherToBe(true)}  // Set to Mothers-to-be view
              >
                Mothers-to-be
              </button>
              <button
                className={clsx('pricing-head_btn', !isMotherToBe && 'text-pink-950')}
                onClick={() => setIsMotherToBe(false)}  // Set to Gynecologists view
              >
                Gynecologists
              </button>

              <div
                className={clsx(
                  'g4 rounded-14 before:h-100 pricing-head_btn_before absolute left-2 top-2 h-[calc(100%-16px)] w-[calc(50%-8px)] overflow-hidden shadow-400 transition-transform duration-500',
                  !isMotherToBe && 'translate-x-full',
                )}
              />
            </div>

            <div className="pricing-bg">
              <img
                src="/images/Background.gif"
                width={960}
                height={380}
                alt="outline"
                className="relative z-2"
              />
            </div>
          </div>

          {/*  Pricing Section */}
          <div className="scroll-hide relative z-2 -mt-12 flex items-start max-xl:gap-5 max-xl:overflow-auto max-xl:pt-6">
            {plans.map((plan, index) => (
              <div
                key={plan.id}
                className="pricing-plan_first pricing-plan_last pricing-plan_odd pricing-plan_even relative border-2 p-7 max-xl:min-w-80 max-lg:rounded-3xl xl:w-[calc(33.33%+2px)]"
              >
                {index === 1 && (
                  <div className="g11 absolute h-330 left-0 right-0 top-0 z-1 rounded-tl-3xl rounded-tr-3xl" />
                )}

                <div
                  className={clsx(
                    'absolute left-0 right-0 z-2 flex items-center justify-center',
                    index === 1 ? '-top-6' : '-top-6 xl:-top-11',
                  )}
                >
                  {/* Circle background behind the image */}
                  <div
                    className={clsx(
                      'absolute rounded-full shadow-xl',
                      index === 1 ? 'w-[140px] h-[140px]  bg-s9' : 'w-[100px] bg-p8 h-[100px]',
                    )}
                  />
                  {/* Image element */}
                  <img
                    src={plan.logo}
                    alt={plan.title}
                    className={clsx(
                      'p-2 relative object-contain drop-shadow-2xl',
                      index === 1 ? 'size-[120px]' : 'size-[88px]',
                    )}
                  />
                </div>
                <div
                  className={clsx(
                    'relative flex flex-col items-center',
                    index === 1 ? 'pt-24' : 'pt-12',
                  )}
                >
                  <div
                    className={clsx(
                      'small-2 rounded-20 relative z-2 mx-auto mb-6 border-2 px-4 py-1.5 uppercase',
                      index === 1 ? 'border-p5 text-p5' : 'border-p6 text-p6',
                    )}
                  >
                    {plan.title}
                  </div>

                  <div className="relative z-2 flex items-center justify-center">
                    <div
                      className={clsx(
                        'h-num flex items-start',
                        index === 1 ? 'text-p7' : 'text-p6',
                      )}
                    >
                      ${' '}
                      <CountUp
                        start={plan.pricePreg}
                        end={isMotherToBe ? plan.pricePreg : plan.priceGyn} // Adjust price based on selection
                        duration={0.4}
                        useEasing={false}
                        preserveValue
                        decimals={2}
                      />
                    </div>
                    <div className="small-1 relative top-3 ml-1 uppercase text-p7">/mo</div>
                  </div>
                </div>
                <div
                  className={clsx(
                    'body-1 relative z-2 mb-10 w-full border-b-p4 pb-9 text-center text-p7',
                    index === 1 && 'border-b',
                  )}
                >
                  {plan.caption}
                </div>

                {/* Feature list changes based on selection */}
                <ul className="mx-auto  space-y-4 xl:px-7">
                  {(isMotherToBe ? plan.featuresPreg : plan.featuresGyn).map((feature) => (
                    <li key={feature} className="relative flex items-center gap-5">
                      <img
                        src={index === 1 ? '/images/tick.png' : '/images/tick1.png'}
                        alt="check"
                        className="size-5 object-contain"
                      />
                      <p className={clsx('flex-1 ', index === 1 ? 'text-p7' : 'text-p6')}>
                        {feature}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex w-full justify-center">
                  <Button icon={plan.icon}>Get Started</Button>
                </div>

                {index === 1 && (
                  <p className="small-compact mt-9 text-center text-p7 before:mx-2.5 before:content-['-'] after:mx-2.5 after:content-['-']">
                    Limited time offer
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </Element>
    </section>
  );
};

export default Pricing;
