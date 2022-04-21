import styled from 'styled-components';
import { Theme } from '../../theme';

export const DivLogo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: ${Theme.margin} 0;
`;

export const DivInputsLogin = styled.div`
    display: flex;
    flex-direction: column;
    margin: ${Theme.margin};
    gap: 30px;
`;

export const DivEye = styled.div`
    font-size: 25px;
    position: absolute;
    margin-left: 88%;
    margin-top: -8.5%;
    color: ${Theme.color.white};
`;