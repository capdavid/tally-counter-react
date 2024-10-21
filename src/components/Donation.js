import styled from 'styled-components';
import React, { PropTypes } from 'react';

const Donation = ({ className, ...props }) => {
    return (
        <StickyDonationWrapper>
            <StyledHr />
            <DonationCore {...props} />
        </StickyDonationWrapper>
    );
};

const DonationCore = ({ className, ...props }) => {
    switch (props.textOption) {
        case 1:
            return (
                <p>
                    If Tally Counter is providing long term value, you may consider{' '}
                    <DonationLink href="https://ko-fi.com/davidcap" target="_blank">
                        donating
                    </DonationLink>
                    .
                </p>
            );
        case 2:
            return (
                <p>
                    Does Tally Counter keep you organised? <br />
                    <DonationLink href="https://ko-fi.com/davidcap" target="_blank">
                        Your support
                    </DonationLink>{' '}
                    makes a difference.
                </p>
            );
        case 3:
            return (
                <p>
                    If Tally Counter nurtures your productivity,
                    <br />
                    consider sending a{' '}
                    <DonationLink href="https://ko-fi.com/davidcap" target="_blank">
                        tip
                    </DonationLink>
                    .
                </p>
            );
        case 4:
            return (
                <a href="https://ko-fi.com/S6S714X4EF" target="_blank" rel="noopener noreferrer">
                    <img
                        height="28"
                        style={{
                            border: '0px',
                            height: '28px',
                            fontSize: '1rem !important',
                        }}
                        src="https://storage.ko-fi.com/cdn/kofi2.png?v=3"
                        border="0"
                        alt="Buy Me a Coffee at ko-fi.com"
                    />
                </a>
            );
        default:
            return null;
    }
};

const StickyDonationWrapper = styled.div`
    position: sticky;
    bottom: 0;
    background: ${props => props.theme.backgroundColor};
    padding-bottom: 0.5rem;
    margin-top: 0.5rem;
    font-size: 0.8rem;
`;

const DonationLink = styled.a`
    color: ${props => props.theme.accentColor};
    text-decoration: underline;
    font-weight: bold;
    &:hover {
        text-decoration: underline;
    }
`;

const StyledHr = styled.hr`
    border: none;
    height: 1px;
    background-color: ${props => props.theme.primaryColor};
    margin: 0.5rem 0;
`;

Donation.propTypes = {
    textOption: PropTypes.number.isRequired,
};

export default Donation;
