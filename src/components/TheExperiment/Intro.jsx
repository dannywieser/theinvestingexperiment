import React from 'react';

export const Intro = () => (
  <div className="intro">
    <span>
      <p>
        Tired of conflicting advice about how to invest my money, and certain that with a bit of
        care and knowledge that I can do better, I’ve decided to run an experiment with 4 accounts
        using different strategies for investing and track the results over time.
      </p>
      <p>It takes a long time to see proper outcomes, so I will run this experiment from</p>
      <p className="dates">January 1, 2020 &mdash; January 1, 2025</p>
      <p></p>
      <h2>Practices and Guidelines</h2>
      <ul>
        <li>
          I will log all transactions that take place across the different accounts in order to
          effectively track results across all accounts.
        </li>
        <li>I will post a monthly results update that summarizes the state of each account.</li>
        <li>
          I will use blog posts to note interesting learnings from the experiment and each account
          strategy.
        </li>
        <li>
          I will take into consideration the fees for each account type in terms of their impact on
          overall return on investment.
        </li>
        <li>
          With one exception, the core strategy across all accounts is consistent automated
          contributions on a bi-weekly basis.
        </li>
      </ul>
    </span>
  </div>
);
