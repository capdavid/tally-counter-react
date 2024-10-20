import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import uuid from 'uuid/v4';
import debounce from 'lodash.debounce';

import { getData, storageSync } from './storage';
import { increaseCommands, decreaseCommands } from './commands.js';

import { light, dark } from './theme';
import Container from './components/Container';
import Donation from './components/Donation.js';
import Header from './components/Header';
import ImageButton from './components/ImageButton';
import Item from './components/Item';
import Logo from './components/Logo';
import TextButton from './components/TextButton';

/* global chrome */

class App extends Component {
    state = {
        notifications: true,
        dark: true,
        items: [],
        isReorderMode: false,
        showDonation: null,
    };

    async componentDidMount() {
        this.setState({
            dark: localStorage.getItem('darkTheme') && localStorage.getItem('darkTheme') === 'true',
        });

        const items = await getData();
        const notificationsRes = await chrome.storage.local.get(['notifications']);

        this.setState({
            items: items,
            notifications: 'notifications' in notificationsRes && notificationsRes.notifications,
            showDonation: Math.random() < 0.15 ? Math.floor(Math.random() * 4) + 1 : null,
        });

        chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
            if (increaseCommands.includes(message)) {
                const index = message.substr(0, 1);
                sendResponse('increased');
                this.incrementHandler(index);
            }

            if (decreaseCommands.includes(message)) {
                const index = message.substr(0, 1);
                sendResponse('decreased');
                this.decrementHandler(index);
            }
        });
    }

    componentDidUpdate(_, prevState) {
        if (prevState.items !== this.state.items && !this.state.isReorderMode) {
            this.debouncedStorageSync();
        }
    }

    debouncedStorageSync = debounce(() => storageSync(this.state.items), 200);

    getState = () => {
        const updatedState = {
            ...this.state,
            items: [...this.state.items],
        };
        return updatedState;
    };

    toggleNotificationsHandler = async () => {
        const notifications = !this.state.notifications;
        await chrome.storage.local.set({ notifications: notifications });
        this.setState(prevState => ({
            notifications: !prevState.notifications,
        }));
    };

    toggleThemeHandler = () => {
        const theme = !this.state.dark;
        localStorage.setItem('darkTheme', theme);
        this.setState(prevState => ({
            dark: !prevState.dark,
        }));
    };

    addItemHandler = () => {
        const updatedState = this.getState();
        updatedState.items.push({ itemName: '', number: 0, id: uuid() });
        this.setState(updatedState);
    };

    resetAllHandler = () => {
        const conf = window.confirm('Are you sure? All values will be reset to 0.');
        if (!conf) {
            return;
        } else {
            const updatedArray = this.state.items.map(item => {
                item.number = 0;
                return item;
            });
            this.setState({ items: updatedArray });
        }
    };

    onChangeHandler = (e, index, type) => {
        const updatedState = this.getState();
        updatedState.items[index][type] = type === 'number' ? +e.target.value : e.target.value;
        this.setState(updatedState);
    };

    deleteHandler = id => {
        const updatedArray = this.state.items.filter((_, index) => index !== id);
        this.setState({ items: updatedArray });
    };

    incrementHandler = index => {
        const updatedState = this.getState();
        updatedState.items[index].number++;
        this.setState(updatedState);
    };

    decrementHandler = index => {
        const updatedState = this.getState();
        updatedState.items[index].number--;
        this.setState(updatedState);
    };

    resetHandler = index => {
        const updatedState = this.getState();
        updatedState.items[index].number = 0;
        this.setState(updatedState);
    };

    exportHandler = () => {
        let arrOfValues = this.state.items.map(item => item.itemName + ',' + item.number);
        arrOfValues.unshift('Item name,Number');
        const csv = arrOfValues.join('\n');
        const data = new Blob(['\ufeff', csv], { type: 'text/csv;charset=utf-8' });
        const url = window.URL.createObjectURL(data);
        document.getElementById('export').href = url;
    };

    // Reorder mode

    toggleReorderMode = () => {
        this.setState(prevState => ({
            isReorderMode: !prevState.isReorderMode,
        }));
    };

    onDragStart = (e, index) => {
        e.dataTransfer.setData('text/plain', index);
    };

    onDragOver = e => {
        e.preventDefault();
    };

    onDrop = (e, dropIndex) => {
        e.preventDefault();
        const dragIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
        const items = Array.from(this.state.items);
        const [reorderedItem] = items.splice(dragIndex, 1);
        items.splice(dropIndex, 0, reorderedItem);
        this.setState({ items });
    };

    saveReorderedItems = () => {
        this.setState({ isReorderMode: false }, () => {
            this.debouncedStorageSync();
        });
    };

    render() {
        return (
            <ThemeProvider theme={this.state.dark ? dark : light}>
                <Container>
                    <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                        <ImageButton
                            left
                            small
                            className="fas fa-bars"
                            style={{ width: '20px' }}
                            onClick={this.toggleReorderMode}
                            title="Reorder items"
                            isReorderMode={this.state.isReorderMode}
                        />
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                position: 'absolute',
                                left: '50%',
                                transform: 'translateX(-50%)',
                            }}>
                            <Header>Tally Counter</Header>
                            <Logo />
                        </div>
                        <div>
                            <ImageButton
                                right
                                small
                                className={this.state.notifications ? 'fas fa-bell-slash' : 'fas fa-bell'}
                                style={{ width: '20px' }}
                                onClick={this.toggleNotificationsHandler}
                                title="Toggle hotkey notifications"
                            />
                            <ImageButton
                                small
                                right
                                className={this.state.dark ? 'fa fa-lightbulb' : 'fas fa-moon'}
                                style={{ width: '22.4px' }}
                                onClick={this.toggleThemeHandler}
                                title="Toggle night mode"
                            />
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0' }}>
                        {!this.state.isReorderMode ? (
                            <>
                                <TextButton float="left" onClick={this.addItemHandler}>
                                    Add item
                                </TextButton>

                                <a id="export" href="index.html" download="tally-counter.csv">
                                    <ImageButton
                                        className="fas fa-file-download"
                                        onClick={this.exportHandler}
                                        title="Export to .csv"
                                    />
                                </a>

                                <TextButton type="danger" float="right" onClick={this.resetAllHandler}>
                                    Reset all
                                </TextButton>
                            </>
                        ) : (
                            <TextButton onClick={this.saveReorderedItems} style={{ margin: '0 auto' }}>
                                Save order
                            </TextButton>
                        )}
                    </div>
                    {this.state.items.map((item, index) => (
                        <div
                            key={item.id}
                            draggable={this.state.isReorderMode}
                            onDragStart={e => this.onDragStart(e, index)}
                            onDragOver={this.onDragOver}
                            onDrop={e => this.onDrop(e, index)}>
                            <Item
                                numberValue={item.number}
                                itemName={item.itemName}
                                itemNameChange={e => this.onChangeHandler(e, index, 'itemName')}
                                numberChange={e => this.onChangeHandler(e, index, 'number')}
                                delete={() => this.deleteHandler(index)}
                                increment={() => this.incrementHandler(index)}
                                decrement={() => this.decrementHandler(index)}
                                reset={() => this.resetHandler(index)}
                                isReorderMode={this.state.isReorderMode}
                                index={index}
                                darkTheme={this.state.dark}
                            />
                        </div>
                    ))}
                    {this.state.showDonation ? (
                        <Donation textOption={this.state.showDonation} />
                    ) : (
                        <div style={{ paddingBottom: '0.5rem' }} />
                    )}
                </Container>
            </ThemeProvider>
        );
    }
}

export default App;
