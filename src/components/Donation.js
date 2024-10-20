import styled from 'styled-components';
import React, { PropTypes } from 'react';

const Donation = ({ className, ...props }) => {
    switch (props.textOption) {
        case 0:
            return (
                <DonationDiv>
                    <StyledHr />
                    <p>
                        If Tally Counter is providing long term value, you may consider{' '}
                        <DonationLink href="https://ko-fi.com/davidcap" target="_blank">
                            donating
                        </DonationLink>
                        .
                    </p>
                </DonationDiv>
            );
        case 1:
            return (
                <DonationDiv>
                    <StyledHr />
                    <p>
                        Does Tally Counter keep you organised? <br />
                        Consider sending a{' '}
                        <DonationLink href="https://ko-fi.com/davidcap" target="_blank">
                            tip
                        </DonationLink>
                        .
                    </p>
                </DonationDiv>
            );
        case 2:
            return (
                <DonationDiv>
                    <StyledHr />
                    <p>
                        If Tally Counter nurtures your productivity,
                        <br />
                        <DonationLink href="https://ko-fi.com/davidcap" target="_blank">
                            your support
                        </DonationLink>{' '}
                        makes a difference.
                    </p>
                </DonationDiv>
            );
        case 3:
            return (
                <a href="https://ko-fi.com/S6S714X4EF" target="_blank" rel="noopener noreferrer">
                    <img
                        height="28"
                        style={{
                            border: '0px',
                            height: '28px',
                            fontSize: '1rem',
                            marginTop: '0.5rem',
                            marginBottom: '0.5rem',
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

const DonationDiv = styled.div`
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
`;

// border-top: 1px solid ${props => props.theme.primaryColor};

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
