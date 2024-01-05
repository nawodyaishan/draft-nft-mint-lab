import React, {useEffect, useState} from "react";
import {useService} from "react-service-locator";
import {MintingService} from "../services/minting-service";
import {WalletConnectorWrapper} from "../components/WalletConnectorWrapper";
import {Button, Card, Col, Container, Navbar, Row} from "react-bootstrap";
import {useConnectWallet} from "@web3-onboard/react";

export const Lab = () => {
    const mintingService = useService(MintingService);
    useEffect(() => {
        console.log("Updated Ui");
    }, [mintingService.state.amount]);

    const [{wallet, connecting}] = useConnectWallet();

    const [mintAmount, setMintAmount] = useState(mintingService.mintAmount);

    const handleMint = async () => {
        await mintingService.mint(wallet);
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
                                <div className="d-flex align-items-center justify-content-center my-3">
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => setMintAmount(Math.max(mintAmount - 1, 0))}
                                        disabled={mintAmount <= 0}
                                    >
                                        -
                                    </Button>
                                    <div className="mx-3">{mintAmount}</div>
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => setMintAmount(mintAmount + 1)}
                                    >
                                        +
                                    </Button>
                                </div>
                                <Button
                                    variant="primary"
                                    onClick={handleMint}
                                    disabled={!wallet || connecting}
                                >
                                    Mint Now
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <WalletConnectorWrapper/>
            </Container>
        </div>
    );
};
