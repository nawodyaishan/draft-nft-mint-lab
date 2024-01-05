import React, {useState} from 'react';
import {useService} from 'react-service-locator';
import {MintingService} from '../services/minting-service';
import {WalletConnectorWrapper} from '../components/WalletConnectorWrapper';
import {Button, Card, Col, Container, Modal, Navbar, Row} from 'react-bootstrap';
import {useConnectWallet} from '@web3-onboard/react';
import '../styles/AppStyles.css';

export const Lab = () => {
    const mintingService = useService(MintingService);
    const [{wallet, connecting}] = useConnectWallet();

    const [showModal, setShowModal] = useState(false);
    const [isMinting, setIsMinting] = useState(false);

    const handleMint = async () => {
        if (wallet) {
            setIsMinting(true);
            const result = await mintingService.mint(wallet);
            setIsMinting(false);
            if (result === "Success") {
                setShowModal(true);
            }
        } else {
            console.log('Wallet not connected');
        }
    };

    return (
        <div>
            <Navbar className="navbar-custom" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Draftables NFT Minting Lab</Navbar.Brand>
                </Container>
            </Navbar>


            <Container className="container-custom mt-5">
                <WalletConnectorWrapper/>

                <Row className="justify-content-md-center row-custom">
                    <Col xs={12} sm={10} md={8} lg={6}>
                        <Card className="card-custom">
                            <Card.Body>
                                <Card.Title>How to Mint an NFT</Card.Title>
                                <Card.Text>
                                    Follow these steps to mint your Draftables NFT:
                                    <ol>
                                        <li>Add the Sepolia Test Network to your MetaMask wallet. For detailed
                                            instructions, visit <a
                                                href="https://www.alchemy.com/overviews/how-to-add-sepolia-to-metamask"
                                                target="_blank" rel="noopener noreferrer">Alchemy's guide</a>.
                                        </li>
                                        <li>Obtain test funds for the Sepolia network at <a
                                            href="https://sepoliafaucet.com/" target="_blank" rel="noopener noreferrer">Sepolia
                                            Faucet</a>.
                                        </li>
                                        <li>Switch to the Sepolia Test Network in your MetaMask wallet.</li>
                                        <li>Click 'Mint Now' to mint your NFT.</li>
                                        <li>View your minted NFT on <a href="https://testnets.opensea.io/"
                                                                       target="_blank" rel="noopener noreferrer">OpenSea
                                            Testnet</a>.
                                        </li>
                                    </ol>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>


                <Row className="justify-content-md-center row-custom">
                    <Col md={6}>
                        <Card className="card-custom">
                            <Card.Body>
                                <Card.Title>Mint Your NFT</Card.Title>
                                <Button
                                    className="btn-custom"
                                    onClick={handleMint}
                                    disabled={!wallet || connecting || isMinting}
                                >
                                    {isMinting ? 'Minting...' : 'Mint Now'}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal className="modal-custom" show={showModal} onHide={() => setShowModal(false)}>
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
