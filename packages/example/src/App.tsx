import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ProviderExamples from './ProviderExamples';
import WalletConnectExamples from './WalletConnectExamples';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface State {
    isModalVisible: boolean;
    modalTitle?: string;
    modalBody?: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

export default class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isModalVisible: false,
        };
    }

    openModal = (title: string, body: React.ReactNode): void => {
        this.setState({
            isModalVisible: true,
            modalTitle: title,
            modalBody: body,
        });
    };

    closeModal = (): void => {
        this.setState({
            isModalVisible: false,
        });
    };

    render(): JSX.Element {
        return (
            <>
                <Router>
                    <Navbar bg="light" expand="lg">
                        <Container>
                            <Navbar.Brand>TrustWallet Examples</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="navigation">
                                <Nav className="mr-auto">
                                    <LinkContainer exact to="/">
                                        <Nav.Link>Provider</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/walletconnect">
                                        <Nav.Link>WalletConnect</Nav.Link>
                                    </LinkContainer>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <Container className="content">
                        <Route
                            exact
                            path="/"
                            render={(): JSX.Element => (
                                <ProviderExamples closeModal={this.closeModal} openModal={this.openModal} />
                            )}
                        />
                        <Route
                            path="/walletconnect"
                            render={(): JSX.Element => (
                                <WalletConnectExamples closeModal={this.closeModal} openModal={this.openModal} />
                            )}
                        />
                    </Container>
                </Router>

                <Modal centered show={this.state.isModalVisible} onHide={this.closeModal} scrollable>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{this.state.modalBody}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.closeModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
