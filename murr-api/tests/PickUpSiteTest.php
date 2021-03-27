<?php
namespace App\Tests;
use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\PickUp;
use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;
use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;

class PickUpSiteTest extends ApiTestCase
{
    //refreshes the database for every test
    use RefreshDatabaseTrait;

    //something is wrong cause i cannot see the pickup i created after the test.

    private $pickUp;

    //static URL
    //const API_URL = '127.0.0.1:8000/api/pick_ups';
    const API_URL = 'localhost:8000/pickups';

    //Sets up each test with the variable that will be inputted into the test

    /**
     * @before
     */
    public function setup(): void
    {
        //all bins collected
        $this->pickUp = [
            'siteId' => 1,
            'numCollected' => 5,
            'numContaminated' => 0,
            'numObstructed' => 0,
            'dateTime' => "2021-03-26"
        ];
    }


    /**
    -     * Purpose: Test All 5 bins marked as collected
    -     * Expected Result: Success
    -     * Return: JSONLD of a Pickup transaction history object
    -     * @test
    -     */
    public function TestBinsCollected(): void
    {
        //this will index for site one
        $response = static::createClient()->request('POST', self::API_URL, ['json' => $this->pickUp]);
        //this status code means "Created"
        $this->assertResponseStatusCodeSame(200);
        //this will check if the header has a content type of a json ld object
        //$this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        //this will will check if the url has the proper pattern and id
        //$this->assertMatchesRegularExpression('/^\/api\/pick_ups\/\d+$/', $response->toArray()['@id']);
        //this will check if the item returned is a PickUp object class
        $this->assertMatchesResourceItemJsonSchema(PickUp::class);
        //JSONLD expected result should be this:
        $this->assertJsonContains([
            'siteObject' => "/api/sites/1",
            'id' => 1,
            'numCollected' => 5,
            'numContaminated' => 0,
            'numObstructed' => 0,
            'dateTime' => "2021-03-26"
        ]);
    }

    /**
         * Purpose: Test All 5 bins marked as all bin types
         * Expected Result: Success
         * Return: JSONLD of a Pickup transaction history object
         * @test
         */
    public function TestTestBinsCollectedObstructedContaminated(): void
    {
        $this->pickUp['numCollected'] = 2;
        $this->pickUp['numObstructed'] = 1;
        $this->pickUp['numContaminated'] = 2;

        $response = static::createClient()->request('POST', self::API_URL, ['json' => $this->pickUp]);
        $this->assertResponseStatusCodeSame(200);
        //$this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        //$this->assertMatchesRegularExpression('/^\/api\/pick_ups\/\d+$/', $response->toArray()['@id']);
        $this->assertMatchesResourceItemJsonSchema(PickUp::class);

        //JSONLD expected result should be this:
        $this->assertJsonContains([
            'siteObject' => "/api/sites/1",
            'id' => 1,
            'numCollected' => 2,
            'numContaminated' => 2,
            'numObstructed' => 1,
            'dateTime' => "2021-03-26"
        ]);

    }

    /**
         * Purpose: Test if the bin input is less than the number of bins to a site (5)
         * Expected Result: Failure -- Status Response 400
         * Return: hydra description of: 'site: Number of bins do not match.'.
         * @test
         */
   public function TestValidNumberOfBinsLessThanFour(): void
   {
       self::createClient()->request('POST', self::API_URL, ['json' => [
           'siteId' => 1,
            'numCollected' => 2,
            'numContaminated' => 1,
            'numObstructed' => 1,
            'dateTime' => "2021-03-08"
           ]]);
       $this->assertResponseStatusCodeSame(400);
       //$this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

       //expected hydra result
           $this->assertJsonContains([
               "content" => "site: Number of bins do not match."
           ]);

   }



}