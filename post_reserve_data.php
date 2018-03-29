<?php
$errors = array();
$data = array();
// Getting posted data and decodeing json
$_POST = json_decode(file_get_contents('php://input'), true);

// checking for blank values.
if (empty($_POST['shortname']))
  $errors['shortname'] = 'Vacation destination is empty.';

if (empty($_POST['adults']))
  $errors['adults'] = 'No adults are present.';

if (empty($_POST['children']))
  $errors['children'] = 'No children are present.';

if (empty($_POST['depart']))
  $errors['depart'] = 'No departure date is set.';

if (empty($_POST['return']))
  $errors['return'] = 'No return date is set.';

if (!empty($errors)) {
  $data['errors']  = $errors;
} else {
  $data['message'] = 'Form data is going well';
}
// response back.
echo json_encode($data);
?>