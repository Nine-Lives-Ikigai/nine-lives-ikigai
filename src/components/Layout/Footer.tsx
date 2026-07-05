import { footerData } from '../../utils/data';

const Footer = () => {
  const { legalLine, taxExemptStatusNote } = footerData;

  return (
    <div className="footer-container">
      <div className="footer-controls">
        {(legalLine || taxExemptStatusNote) && (
          <span className="footer-signature">
            {legalLine}
            {legalLine && taxExemptStatusNote && <br/>}
            {taxExemptStatusNote}
          </span>
        )}
         <br/>
        <span className="footer-signature">
          Copyright © Nine Lives Ikigai, Inc.
          <br className="mobile-only" />
          <span className="hide-on-mobile__inline">&nbsp;</span>
          All rights reserved.
        </span>        
      </div>
    </div>
  );
};

export default Footer;