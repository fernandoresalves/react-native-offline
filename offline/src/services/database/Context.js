import Realm from 'realm';
import UserSchema from './UserSchema';

export default function context() {
  return Realm.open({
    schema: [UserSchema],
  });
}
