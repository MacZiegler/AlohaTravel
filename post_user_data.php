<?php
$errors = array();
$data = array();
// Getting posted data and decodeing json
$_POST = json_decode(file_get_contents('php://input'), true);

// checking for blank values.
if (empty($_POST['firstname']))
  $errors['firstname'] = 'First name is missing.';

if (empty($_POST['lastname']))
  $errors['lastname'] = 'Last name is missing.';

if (empty($_POST['email']))
  $errors['email'] = 'No email is present.';

if (empty($_POST['username']))
  $errors['username'] = 'No username is entered.';

if (empty($_POST['password']))
  $errors['password'] = 'Password is missing.';

if (!empty($errors)) {
  $data['errors']  = $errors;
  $data['success'] = false;
} else {
  $data['message'] = 'Form data is going well';
  $data['success'] = true;
}
// response back.
echo json_encode($data);
?>