import React, { Fragment } from 'react';
import Spinner from './Spinner';

const About = () => {
  return (
    <Fragment>
      <h1 className='large text-primary'>About Bros Philosophy Club</h1>
      <p className='lead'>
        <i className='fab fa-connectdevelop' /> Here's our story.
      </p>
      <h2 className='text-primary'>Purpose</h2>
      <p className='p-1'>
        To cultivate lasting friendships and encourage courteous, in-person
        discourse, especially when we disagree, among a diverse group of men
        because we believe society will benefit when more of this is happening.
      </p>
      <h2 className='text-primary'>Vision</h2>
      <p className='p-1'>
        The Bros Philosophy Club is a place for bros to talk philosophy in a
        casual, comfortable setting over beers or cocktails or whatever. The
        point is to have fun through engaging, respectful, and enriching
        discussions, fueled by our massive and impressive intellects and,
        naturally, alcohol.
      </p>
      <h2 className='text-primary'>Values</h2>
      <ul className='p-1'>
        <li>Humility</li>
        <li>Courtesy</li>
        <li>Self-control</li>
        <li>Openness</li>
        <li>Rationality</li>
        <li>Fun!</li>
      </ul>
      <h2 className='text-primary'>Club Rules</h2>
      <ol className='p-1'>
        <li>
          Get out of your comfort zone! Be open to ideas that seem odd, make you
          uncomfortable or that you disagree with. Whatever is shared, it
          doesn't mean you have to like it or adopt it.
        </li>
        <br />
        <li>
          Demonstrate courtesy! Be respectful of everyone in the group and their
          unique backgrounds, experiences, and education. All these elements and
          more combine to create filters or lenses through which we interpret
          the world and rarely will two people have the same filters set up in
          the same way. ("...every man I meet is my superior in some way, and in
          that, I learn from him. - Emerson)
        </li>
        <br />
        <li>
          Listen up! Be an active, attentive listener. If you must interrupt, do
          it like a gentleman. No talking over anyone else. ("Seek first to
          understand, then to be understood." - Steven Covey)
        </li>
        <br />
        <li>
          Attack positions, not people! It's ok to attack another Bro's position
          on an issue, even vigorously, but do not attack them personally. See
          Rule #2 for more on this.
        </li>
        <br />
        <li>
          Seek to respond thoughtfully! Don’t react emotionally. Allow for some
          time-space between what you heard or think you want to say and how you
          want to respond.
        </li>
      </ol>
    </Fragment>
  );
};

export default About;
