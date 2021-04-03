import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import './index.css';

import Content from '../../UI/Content';

function Articles(props) {
    const [t, i18n] = useTranslation();

    return (
        <div className="articles">
            <Content>
                Articles
            </Content>
        </div>
    );
}

export default Articles;


