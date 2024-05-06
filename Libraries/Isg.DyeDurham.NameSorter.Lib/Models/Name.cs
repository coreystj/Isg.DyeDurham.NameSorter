/*
 * Summary: This name model is used to handle names.
 * 
 * Date: 2024-05-02
 * Author: Corey St-Jacques
 * 
 */

namespace Isg.DyeDurham.NameSorter.Lib.Models
{
    /// <summary>
    /// This name model class is used to handle names.
    /// </summary>
    public struct Name
    {
        /// <summary>
        /// The current name arguments of this model.
        /// </summary>
        public string[] NameArguments { get; private set; }

        /// <summary>
        /// Constructor with parameters.
        /// </summary>
        /// <param name="names">The names of this class to be used.</param>
        public Name(params string[] names) 
        {
            NameArguments = names;
        }

        /// <summary>
        /// This equals override method is used to compare two names together.
        /// </summary>
        /// <param name="obj">The other name to be compared with.</param>
        /// <returns>Returns true if both names are equal.</returns>
        public override readonly bool Equals(object obj)
        {
            if (!(obj is Name))
            {
                return false;
            }

            Name other = (Name)obj;

            if (NameArguments.Length != other.NameArguments.Length)
                return false;

            for (int i = 0; i < NameArguments.Length; i++)
            {
                if (NameArguments[i] != other.NameArguments[i])
                {
                    return false;
                }
            }

            return true;
        }

        /// <summary>
        /// This override method is used to convert this model to a readable string.
        /// </summary>
        /// <returns>Returns the names using a spaced delimiter.</returns>
        public override readonly string ToString()
        {
            return string.Join(' ', NameArguments);
        }
    }
}
