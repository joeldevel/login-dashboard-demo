<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('users')->insert([
          'username' => 'user1',
          'email' => 'user1@gmail.com',
          'firstname' =>'user1firstname',
          'lastname' =>'user1lastname',
          'dni' => '123123',
          'userimg' => "",
          'password' => bcrypt(1234),
      ]);

      DB::table('users')->insert([
          'username' => 'user2',
          'email' => 'user2@gmail.com',
          'firstname' =>'user2firstname',
          'lastname' =>'user2lastname',
          'dni' => '333666',
          'userimg' => "",
          'password' => bcrypt('abcd'),
      ]);
    }
}
