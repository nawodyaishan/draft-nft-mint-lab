import React, {useState} from 'react';
import {useService} from 'react-service-locator';
import {MintingService} from '../services/minting-service';
import {WalletConnectorWrapper} from '../components/WalletConnectorWrapper';
import {Button, Card, Col, Container, Modal, Navbar, Row} from 'react-bootstrap';
import {useConnectWallet} from '@web3-onboard/react';

export const Lab = () => {
    const mintingService = useService(MintingService);
    const [{wallet, connecting}] = useConnectWallet();

    const [showModal, setShowModal] = useState(false);

    const handleMint = async () => {
        if (wallet) {
            const result = await mintingService.mint(wallet);
            if (result === "Success") {
                setShowModal(true);
            }
        } else {
            console.log('Wallet not connected');
        }
    };

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Draftables NFT Minting Lab</Navbar.Brand>
                </Container>
            </Navbar>

            <Container className="mt-5">
                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Mint Your NFT</Card.Title>
                                <Button variant="primary" onClick={handleMint} disabled={!wallet || connecting}>
                                    Mint Now
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <WalletConnectorWrapper/>
            </Container>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>NFT Minted!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Your NFT has been successfully minted. View your minted NFT asset on <a
                    href="https://testnets.opensea.io/" target="_blank" rel="noopener noreferrer">OpenSea</a>.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
